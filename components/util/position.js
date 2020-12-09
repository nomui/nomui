import { extend } from './index';

var cachedScrollbarWidth,
    max = Math.max,
    abs = Math.abs,
    rhorizontal = /left|center|right/,
    rvertical = /top|center|bottom/,
    roffset = /[\+\-]\d+(\.[\d]+)?%?/,
    rposition = /^\w+/,
    rpercent = /%$/;

var $ = {};

function getOffsets(offsets, width, height) {
    return [
        parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1),
        parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)
    ];
}

function parseCss(element, property) {
    return parseInt(getComputedStyle(element)[property], 10) || 0;
}

function isWindow(obj) {
    return obj != null && obj === obj.window;
}

function getScrollTop(el) {
    var hasScrollTop = 'scrollTop' in el;
    return hasScrollTop
        ? el.scrollTop
        : isWindow(el)
            ? el.pageYOffset
            : el.defaultView.pageYOffset;
}

function getScrollLeft(el) {
    var hasScrollLeft = 'scrollLeft' in el;
    return hasScrollLeft
        ? el.scrollLeft
        : isWindow(el)
            ? el.pageXOffset
            : el.defaultView.pageXOffset;
}

function getOffsetParent(el) {
    return el.offsetParent || el
};

function setOffset(elem, coordinates) {
    var parentOffset = getOffsetParent(elem).getBoundingClientRect(),
        props = {
            top: coordinates.top - parentOffset.top,
            left: coordinates.left - parentOffset.left
        }

    if (getComputedStyle(elem)['position'] == 'static') props['position'] = 'relative'
    elem.style.top = props.top + 'px';
    elem.style.left = props.left + 'px';
    elem.style.position = props.position;
}

function getOffset(elem) {
    if (document.documentElement !== elem && !document.documentElement.contains(elem))
        return { top: 0, left: 0 }
    var obj = elem.getBoundingClientRect()
    return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
    }
}

function getDimensions(elem) {
    if (elem.nodeType === 9) {
        return {
            width: elem.documentElement.scrollWidth,
            height: elem.documentElement.scrollHeight,
            offset: { top: 0, left: 0 }
        };
    }
    if (isWindow(elem)) {
        return {
            width: elem.innerWidth,
            height: elem.innerHeight,
            offset: { top: elem.pageYOffset, left: elem.pageXOffset }
        };
    }
    if (elem.preventDefault) {
        return {
            width: 0,
            height: 0,
            offset: { top: elem.pageY, left: elem.pageX }
        };
    }
    var elemOffset = elem.getBoundingClientRect();
    return {
        width: elem.offsetWidth,
        height: elem.offsetHeight,
        offset: {
            left: elemOffset.left + window.pageXOffset,
            top: elemOffset.top + window.pageYOffset
        }
    };
}

let positionTool = {
    scrollbarWidth: function () {
        if (cachedScrollbarWidth !== undefined) {
            return cachedScrollbarWidth;
        }

        const scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        document.body.appendChild(scrollDiv)
        const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth
        document.body.removeChild(scrollDiv)
        return (cachedScrollbarWidth = scrollbarWidth)
    },
    getScrollInfo: function (within) {
        var overflowX = within.isWindow || within.isDocument ? "" :
            getComputedStyle(within.element)['overflowX'],
            overflowY = within.isWindow || within.isDocument ? "" :
                getComputedStyle(within.element)['overflowY'],
            hasOverflowX = overflowX === "scroll" ||
                (overflowX === "auto" && within.width < within.element.scrollWidth),
            hasOverflowY = overflowY === "scroll" ||
                (overflowY === "auto" && within.height < within.element.scrollHeight);
        return {
            width: hasOverflowY ? positionTool.scrollbarWidth() : 0,
            height: hasOverflowX ? positionTool.scrollbarWidth() : 0
        };
    },
    getWithinInfo: function (element) {
        var withinElement = element || window,
            isElemWindow = isWindow(withinElement),
            isDocument = !!withinElement && withinElement.nodeType === 9,
            hasOffset = !isElemWindow && !isDocument;
        return {
            element: withinElement,
            isWindow: isElemWindow,
            isDocument: isDocument,
            offset: hasOffset ? getOffset(element) : { left: 0, top: 0 },
            scrollLeft: getScrollLeft(withinElement),
            scrollTop: getScrollTop(withinElement),
            width: isWindow ? withinElement.innerWidth : withinElement.offsetWidth,
            height: isWindow ? withinElement.innerHeight : withinElement.offsetHeight
        };
    }
};



let positionFns = {
    fit: {
        left: function (position, data) {
            var within = data.within,
                withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
                outerWidth = within.width,
                collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                overLeft = withinOffset - collisionPosLeft,
                overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
                newOverRight;

            // Element is wider than within
            if (data.collisionWidth > outerWidth) {

                // Element is initially over the left side of within
                if (overLeft > 0 && overRight <= 0) {
                    newOverRight = position.left + overLeft + data.collisionWidth - outerWidth -
                        withinOffset;
                    position.left += overLeft - newOverRight;

                    // Element is initially over right side of within
                } else if (overRight > 0 && overLeft <= 0) {
                    position.left = withinOffset;

                    // Element is initially over both left and right sides of within
                } else {
                    if (overLeft > overRight) {
                        position.left = withinOffset + outerWidth - data.collisionWidth;
                    } else {
                        position.left = withinOffset;
                    }
                }

                // Too far left -> align with left edge
            } else if (overLeft > 0) {
                position.left += overLeft;

                // Too far right -> align with right edge
            } else if (overRight > 0) {
                position.left -= overRight;

                // Adjust based on position and margin
            } else {
                position.left = max(position.left - collisionPosLeft, position.left);
            }
        },
        top: function (position, data) {
            var within = data.within,
                withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
                outerHeight = data.within.height,
                collisionPosTop = position.top - data.collisionPosition.marginTop,
                overTop = withinOffset - collisionPosTop,
                overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
                newOverBottom;

            // Element is taller than within
            if (data.collisionHeight > outerHeight) {

                // Element is initially over the top of within
                if (overTop > 0 && overBottom <= 0) {
                    newOverBottom = position.top + overTop + data.collisionHeight - outerHeight -
                        withinOffset;
                    position.top += overTop - newOverBottom;

                    // Element is initially over bottom of within
                } else if (overBottom > 0 && overTop <= 0) {
                    position.top = withinOffset;

                    // Element is initially over both top and bottom of within
                } else {
                    if (overTop > overBottom) {
                        position.top = withinOffset + outerHeight - data.collisionHeight;
                    } else {
                        position.top = withinOffset;
                    }
                }

                // Too far up -> align with top
            } else if (overTop > 0) {
                position.top += overTop;

                // Too far down -> align with bottom edge
            } else if (overBottom > 0) {
                position.top -= overBottom;

                // Adjust based on position and margin
            } else {
                position.top = max(position.top - collisionPosTop, position.top);
            }
        }
    },
    flip: {
        left: function (position, data) {
            var within = data.within,
                withinOffset = within.offset.left + within.scrollLeft,
                outerWidth = within.width,
                offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
                collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                overLeft = collisionPosLeft - offsetLeft,
                overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                myOffset = data.my[0] === "left" ?
                    -data.elemWidth :
                    data.my[0] === "right" ?
                        data.elemWidth :
                        0,
                atOffset = data.at[0] === "left" ?
                    data.targetWidth :
                    data.at[0] === "right" ?
                        -data.targetWidth :
                        0,
                offset = -2 * data.offset[0],
                newOverRight,
                newOverLeft;

            if (overLeft < 0) {
                newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth -
                    outerWidth - withinOffset;
                if (newOverRight < 0 || newOverRight < abs(overLeft)) {
                    position.left += myOffset + atOffset + offset;
                }
            } else if (overRight > 0) {
                newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset +
                    atOffset + offset - offsetLeft;
                if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
                    position.left += myOffset + atOffset + offset;
                }
            }
        },
        top: function (position, data) {
            var within = data.within,
                withinOffset = within.offset.top + within.scrollTop,
                outerHeight = within.height,
                offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
                collisionPosTop = position.top - data.collisionPosition.marginTop,
                overTop = collisionPosTop - offsetTop,
                overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                top = data.my[1] === "top",
                myOffset = top ?
                    -data.elemHeight :
                    data.my[1] === "bottom" ?
                        data.elemHeight :
                        0,
                atOffset = data.at[1] === "top" ?
                    data.targetHeight :
                    data.at[1] === "bottom" ?
                        -data.targetHeight :
                        0,
                offset = -2 * data.offset[1],
                newOverTop,
                newOverBottom;
            if (overTop < 0) {
                newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight -
                    outerHeight - withinOffset;
                if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
                    position.top += myOffset + atOffset + offset;
                }
            } else if (overBottom > 0) {
                newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset +
                    offset - offsetTop;
                if (newOverTop > 0 || abs(newOverTop) < overBottom) {
                    position.top += myOffset + atOffset + offset;
                }
            }
        }
    },
    flipfit: {
        left: function () {
            positionFns.flip.left.apply(this, arguments);
            positionFns.fit.left.apply(this, arguments);
        },
        top: function () {
            positionFns.flip.top.apply(this, arguments);
            positionFns.fit.top.apply(this, arguments);
        }
    }
};

function position(elem, options) {
    if (!options || !options.of) {
        return;
    }

    // Make a copy, we don't want to modify arguments
    options = extend({}, options);

    var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
        target = options.of,
        within = positionTool.getWithinInfo(options.within),
        scrollInfo = positionTool.getScrollInfo(within),
        collision = (options.collision || "flip").split(" "),
        offsets = {};

    dimensions = getDimensions(target);
    if (target.preventDefault) {

        // Force left top to allow flipping
        options.at = "left top";
    }
    targetWidth = dimensions.width;
    targetHeight = dimensions.height;
    targetOffset = dimensions.offset;

    // Clone to reuse original targetOffset later
    basePosition = extend({}, targetOffset);

    // Force my and at to have valid horizontal and vertical positions
    // if a value is missing or invalid, it will be converted to center
    ["my", "at"].forEach(
        function (item, i) {
            var pos = (options[item] || "").split(" "),
                horizontalOffset,
                verticalOffset;

            if (pos.length === 1) {
                pos = rhorizontal.test(pos[0]) ?
                    pos.concat(["center"]) :
                    rvertical.test(pos[0]) ?
                        ["center"].concat(pos) :
                        ["center", "center"];
            }
            pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
            pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";

            // Calculate offsets
            horizontalOffset = roffset.exec(pos[0]);
            verticalOffset = roffset.exec(pos[1]);
            offsets[item] = [
                horizontalOffset ? horizontalOffset[0] : 0,
                verticalOffset ? verticalOffset[0] : 0
            ];

            // Reduce to just the positions without the offsets
            options[item] = [
                rposition.exec(pos[0])[0],
                rposition.exec(pos[1])[0]
            ];
        }
    );

    // Normalize collision option
    if (collision.length === 1) {
        collision[1] = collision[0];
    }

    if (options.at[0] === "right") {
        basePosition.left += targetWidth;
    } else if (options.at[0] === "center") {
        basePosition.left += targetWidth / 2;
    }

    if (options.at[1] === "bottom") {
        basePosition.top += targetHeight;
    } else if (options.at[1] === "center") {
        basePosition.top += targetHeight / 2;
    }

    atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
    basePosition.left += atOffset[0];
    basePosition.top += atOffset[1];

    var collisionPosition,
        elemWidth = elem.offsetWidth,
        elemHeight = elem.offsetHeight,
        marginLeft = parseCss(elem, "marginLeft"),
        marginTop = parseCss(elem, "marginTop"),
        collisionWidth = elemWidth + marginLeft + parseCss(elem, "marginRight") +
            scrollInfo.width,
        collisionHeight = elemHeight + marginTop + parseCss(elem, "marginBottom") +
            scrollInfo.height,
        position = extend({}, basePosition),
        myOffset = getOffsets(offsets.my, elem.offsetWidth, elem.offsetHeight);

    if (options.my[0] === "right") {
        position.left -= elemWidth;
    } else if (options.my[0] === "center") {
        position.left -= elemWidth / 2;
    }

    if (options.my[1] === "bottom") {
        position.top -= elemHeight;
    } else if (options.my[1] === "center") {
        position.top -= elemHeight / 2;
    }

    position.left += myOffset[0];
    position.top += myOffset[1];

    collisionPosition = {
        marginLeft: marginLeft,
        marginTop: marginTop
    };

    ["left", "top"].forEach(function (dir, i) {
        if (positionFns[collision[i]]) {
            positionFns[collision[i]][dir](position, {
                targetWidth: targetWidth,
                targetHeight: targetHeight,
                elemWidth: elemWidth,
                elemHeight: elemHeight,
                collisionPosition: collisionPosition,
                collisionWidth: collisionWidth,
                collisionHeight: collisionHeight,
                offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                my: options.my,
                at: options.at,
                within: within,
                elem: elem
            });
        }
    });

    setOffset(elem, position);
};

export { positionTool }
export default position