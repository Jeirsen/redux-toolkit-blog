import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPostIds,
  getPostStatus,
  getPostsError,
  fetchPosts,
} from './postSlice';
import PostExcerpt from './PostsExcerpt';

const PostsList = () => {
  const dispatch = useDispatch();
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === 'loading') {
    content = <p>"Loading...."</p>;
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
