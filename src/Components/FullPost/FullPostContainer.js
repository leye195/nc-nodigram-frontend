import React, { useRef, useState } from "react";
import propTypes from "prop-types";
import FullPostPresenter from "./FullPostPresenter";
import useInput from "../../Hooks/useInput";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo-hooks";
import { ADD_COMMENT, ME, TOGGLE_LIKE } from "./FullPostQueries";
import { toast } from "react-toastify";

const FullPostContainer = ({
  id,
  caption,
  location,
  isLiked,
  likeCount,
  user,
  commentCount,
  comments,
  files,
  createdAt,
}) => {
  const likedRef = useRef(null);
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [commentCountS, setCommentCount] = useState(commentCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComment, setSelfComment] = useState([]);
  const comment = useInput("");
  const history = useHistory();
  const { data: meQuery } = useQuery(ME);
  const [addCommentMutation, { loading: addCommentLoading }] = useMutation(
    ADD_COMMENT
  );
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);

  const slide = ({ direction = "left" }) => {
    const totalFiles = files.length;
    if (direction === "right") {
      if (currentItem === totalFiles - 1) setCurrentItem((cur) => 0);
      else setCurrentItem((cur) => cur + 1);
    } else if (direction === "left") {
      if (currentItem === 0) setCurrentItem((cur) => totalFiles - 1);
      else setCurrentItem((cur) => cur - 1);
    }
  };
  const handleLike = async (e) => {
    try {
      if (isLikedS) {
        setIsLiked((cur) => false);
        setLikeCount((cur) => cur - 1);
      } else {
        setIsLiked((cur) => true);
        setLikeCount((cur) => cur + 1);
        likedRef.current.animate(
          [
            { opacity: 0, transform: `scale(1)` },
            { opacity: 1, transform: `scale(1.2)` },
            { opacity: 0, transform: `scale(1.0)` },
          ],
          850
        );
      }
      await toggleLikeMutation({
        variables: { postId: id },
      });
    } catch (e) {
      setIsLiked((cur) => !cur);
      toast.error("Can't register like");
    }
  };

  const onKeyPress = async (e) => {
    const { key } = e;
    console.log(key);
    if (key === "Enter") {
      try {
        e.preventDefault();
        const text = comment.value;
        console.log(comment.value);
        if (text !== "") {
          const {
            data: { addComment },
          } = await addCommentMutation({
            variables: { postId: id, text },
          });
          setSelfComment([
            ...selfComment,
            {
              id: addComment.id,
              text: comment.value,
              user: { username: meQuery.myProfile?.user?.username },
            },
          ]);
          comment.setValue("");
        }
      } catch (e) {
        toast.error("Can't send comment");
      }
    }
  };
  return (
    <FullPostPresenter
      id={id}
      location={location}
      caption={caption}
      isLiked={isLikedS}
      likeCount={likeCountS}
      commentCount={commentCountS}
      files={files}
      user={user}
      comments={comments}
      selfComment={selfComment}
      createdAt={createdAt}
      newComment={comment}
      slide={slide}
      currentItem={currentItem}
      history={history}
      likedRef={likedRef}
      onKeyPress={onKeyPress}
      addCommentLoading={addCommentLoading}
      setIsLiked={handleLike}
    />
  );
};
FullPostContainer.propTypes = {
  id: propTypes.string.isRequired,
  caption: propTypes.string.isRequired,
  location: propTypes.string,
  isLiked: propTypes.bool.isRequired,
  likeCount: propTypes.number.isRequired,
  commentCount: propTypes.number.isRequired,
  createdAt: propTypes.string.isRequired,
  user: propTypes.shape({
    id: propTypes.string.isRequired,
    username: propTypes.string.isRequired,
    avatar: propTypes.string.isRequired,
  }).isRequired,
  files: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      url: propTypes.string.isRequired,
    })
  ).isRequired,
  comments: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      text: propTypes.string.isRequired,
      user: propTypes.shape({
        username: propTypes.string.isRequired,
      }),
      //createdAt: propTypes.string.isRequired,
    })
  ).isRequired,
};
export default FullPostContainer;
