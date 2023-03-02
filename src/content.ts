import StoreManager from './store'

const _StoreManager = new StoreManager()

let x = 0
let y = 0
document.onmousemove = (e) => {
    x = e.pageX
    y = e.pageY
}

function handleEnter(el: HTMLInputElement) {
    if (event.keyCode === 13) {
        const comment = el.value
        const url = window.location.href
        const position = [x, y]
        _StoreManager.setComment({ url, position, comment, date: new Date() })
        el.value = ''
    }
}

function createComment() {
    // document.body.innerHTML += `<div class="commentAll" style="position: absolute; top: ${y}px; left: ${x}px;">
    //                                 <label for="comment" />
    //                                 <input
    //                                     id="comment"
    //                                     type="text"
    //                                     placeholder="Insert Comment"
    //                                     onkeydown="handleEnter(this)"
    //                                 />
    //                             </div>
    //                             `
    const div = document.createElement('div')
    div.setAttribute('class', 'commentAll')
    div.style.cssText = `position: absolute; top: ${y}px; left: ${x}px;`
    const input = document.createElement('input')
    input.setAttribute('id', 'comment')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'Insert Comment')
    div.style.cssText = `position: absolute; top: ${y}px; left: ${x}px;`
    el.setAttribute('type', 'checkbox')
    document.body.appendChild(el)
}

chrome.runtime.onMessage.addListener(
    (
        message: any,
        sender: chrome.runtime.MessageSender,
        sendResponse: (response: any) => void
    ) => {
        //if (message.command == 'comment') {
        //    // insert comment on the mouse position or selection
        //    //if (x && y) {
        //    //    //TODO: add js to handleEnter
        //    //    //
        //    //}
        //}
    }
)
