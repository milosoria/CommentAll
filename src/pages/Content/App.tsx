import React, { useEffect, useMemo, useState } from 'react';
import StoreManager from './modules/store';
import type Comment from './modules/store';

const App = () => {
  console.log('Content script');
  const _StoreManager = useMemo(() => new StoreManager(), []);
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputs, setInput] = useState<any[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const url = document.location.href;

  chrome.runtime.onMessage.addListener(
    (
      message: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: any) => void
    ) => {
      // never getting triggered
      if (message.command === 'comment') {
        console.log(mouse.x, mouse.y);
        // insert comment on the mouse position or selection
        if (mouse.x && mouse.y) {
          setInput((prev) => [...prev, { position: [mouse.x, mouse.y] }]);
        }
      }
    }
  );

  useEffect(() => {
    const comments = _StoreManager.getComments(url);
    setComments(comments || []);
  }, [_StoreManager, url]);

  const handleEnter = (event, inputIndex: number) => {
    if (event.key === 'Enter') {
      const comment = {
        url: url,
        comment: event.target.value,
        position: [mouse.x, mouse.y],
        date: new Date(),
      } as Comment;
      event.target.value = '';
      _StoreManager.addComment(comment);
      setComments((prev) => [...prev, comment]);
      setInput((prev) => prev.filter((_, index) => index !== inputIndex));
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {comments.map((comment) => (
        <div
          key={`${comment.position[0]}-${comment.position[1]}`}
          className={`absolute top-${comment.position[0]}px left-${comment.position[1]}px`}
        >
          <p>{comment.comment}</p>
        </div>
      ))}
      {inputs.map((input, index) => (
        <div
          key={`${input.position[0]}-${input.position[1]}`}
          className={`absolute top-${input.position[0]}px left-${input.position[1]}px`}
        >
          <input
            type="text"
            placeholder="Insert Comment"
            onKeyUp={(event) => handleEnter(event, index)}
          />
        </div>
      ))}
    </>
  );
};

export default App;
