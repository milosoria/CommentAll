console.log('Listening for commands');
chrome.commands.onCommand.addListener(() => {
    chrome.tabs.query(
        { active: true, currentWindow: true },
        (tabs: chrome.tabs.Tab[]) => {
            chrome.tabs.sendMessage(tabs[0].id as number, {
                command: 'comment',
            });
        }
    );
});
