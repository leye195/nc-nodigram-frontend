export const filterToUser = (users, me) =>
  users.filter((user) => user.username !== me.username)[0];

export const getRecentMessage = (messages) => {
  const text = messages[messages.length - 1].text;
  const textLength = text.length;
  return textLength >= 20 ? `${text}...` : text;
};

export const isMine = (username, from) => username === from;

export const checkParent = (target, className) => {
  let parent = target;
  while (!parent.classList.contains(className)) parent = parent.parentNode;
  return parent.classList.contains(className);
};
