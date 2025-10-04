import React, { useState } from 'react';
import { User } from './types/User';

type Props = {
  users: User[];
  onSubmit: (data: { title: string; userId: number }) => void;
};

export const PostForm: React.FC<Props> = ({ users, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');

  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const isTitleEmpty = !trimmedTitle;
    const isUserUnselected = !userId;

    setShowTitleError(isTitleEmpty);
    setShowUserError(isUserUnselected);

    if (isTitleEmpty || isUserUnselected) {
      return;
    }

    onSubmit({
      title: trimmedTitle,
      userId: Number(userId),
    });

    // очищаємо форму після сабміту
    setTitle('');
    setUserId('');
    setShowTitleError(false);
    setShowUserError(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);

            // Ховаємо тільки title-ошибку
            if (showTitleError) {
              setShowTitleError(false);
            }
          }}
        />
        {showTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);

            // Ховаємо тільки user-ошибку
            if (showUserError) {
              setShowUserError(false);
            }
          }}
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {showUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
