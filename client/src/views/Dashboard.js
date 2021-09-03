import { PostContext } from "../contexts/PostContext";
import { useContext, useEffect } from "react";

const Dashboard = () => {
  const {
    postState: { posts, postsLoading },
    getPosts,
  } = useContext(PostContext);

  //Start: all posts
  useEffect(() => getPosts(), []);

  return <h1>DASHBOARD</h1>;
};

export default Dashboard;
