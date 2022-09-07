import { Post } from "../entity/Post";
import bcrypt from "bcrypt";

/**
 * 입력된 비밀번호를 DB 내에 존재하는 비밀번호와 비교하는 함수
 */
const checkPassword = async (password: string, hash: string) => {
  const result = bcrypt.compareSync(password, hash);
  if (!result) {
    throw new Error("Password is wrong");
  }
};

/**
 * 게시글을 생성하는 함수
 */
export const createPost = async (title: string, content: string, password: string) => {
  try {
    const post = new Post();
    post.title = title;
    post.content = content;
    post.password = bcrypt.hashSync(password, 12);
    await post.save();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * 게시글들을 요구한 만큼 가져오는 함수
 */
export const getAllPost = async (page: number, perPage: number) => {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * 특정 게시글을 가져오는 함수
 */
export const getPost = async (postId: number) => {
  try {
    const post = await Post.findOne({ where: { id: postId } });
    return post;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * 특정 게시글을 수정하는 함수
 */
export const updatePost = async (
  postId: number,
  title: string,
  content: string,
  password: string
) => {
  try {
    const postInfo = await Post.findOne({ where: { id: postId } });
    if (!postInfo) {
      throw new Error("Post doesn't exist in DB");
    }
    checkPassword(password, postInfo.password);

    postInfo.title = title;
    postInfo.content = content;
    await postInfo.save();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * 특정 게시글을 삭제하는 함수
 */
export const deletePost = async (postId: number, password: string) => {
  try {
    const postInfo = await Post.findOne({ where: { id: postId } });
    if (!postInfo) {
      throw new Error("Post doesn't exist in DB");
    }
    checkPassword(password, postInfo.password);

    await Post.remove(postInfo);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
