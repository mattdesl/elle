module.exports = function html(element, value) {
    if (typeof value === 'string')
        element.innerHTML = value
    else
        return element.innerHTML
}