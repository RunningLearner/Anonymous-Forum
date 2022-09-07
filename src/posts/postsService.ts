import { Post } from "../entity/Post";
import bcrypt from "bcrypt";
import { BadRequestError, ForbiddenError } from "../utils/error/errors";

/**
 * 비밀번호 규칙을 만족하는지 확인하는 함수
 */
const checkPasswordPattern = (password: string) => {
  if (!password.match(/^(?=.*[0-9]).{6,}$/)) {
    throw new ForbiddenError("비밀번호가 규칙에 어긋납니다!");
  }
};

/**
 * 입력된 비밀번호를 DB 내에 존재하는 비밀번호와 비교하는 함수
 */
const checkPassword = (password: string, hash: string) => {
  const result = bcrypt.compareSync(password, hash);
  if (!result) {
    throw new ForbiddenError("비밀번호가 틀렸습니다!");
  }
};

/**
 * 제목과 내용의 길이를 제한하는 함수
 */
const checkLength = (title: string, content: string) => {
  if (title.length >= 21) {
    throw new BadRequestError("제목이 너무 깁니다!");
  }
  if (content.length >= 201) {
    throw new BadRequestError("내용이 너무 깁니다!");
  }
};

/**
 * 게시글을 생성하는 함수
 */
export const createPost = async (title: string, content: string, password: string) => {
  try {
    checkLength(title, content);
    checkPasswordPattern(password);
    const post = new Post();
    post.title = title;
    post.content = content;
    post.password = bcrypt.hashSync(password, 12);
    await post.save();
  } catch (error) {
    throw error;
  }
};

/**
 * 게시글들을 요구한 만큼 가져오는 함수
 */
export const getAllPost = async (page: number, perPage: number) => {
  try {
    const posts = await Post.find({ skip: (page - 1) * perPage, take: perPage });
    return posts;
  } catch (error: any) {
    throw error;
  }
};

/**
 * 특정 게시글을 가져오는 함수
 */
export const getPost = async (postId: number) => {
  try {
    const post = await Post.findOne({
      select: { title: true, content: true },
      where: { id: postId },
    });
    return post;
  } catch (error: any) {
    throw error;
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
      throw new Error("게시물이 존재하지 않습니다!");
    }
    checkPassword(password, postInfo.password);
    checkLength(title, content);

    postInfo.title = title;
    postInfo.content = content;
    await postInfo.save();
  } catch (error: any) {
    throw error;
  }
};

/**
 * 특정 게시글을 삭제하는 함수
 */
export const deletePost = async (postId: number, password: string) => {
  try {
    const postInfo = await Post.findOne({ where: { id: postId } });
    if (!postInfo) {
      throw new Error("게시물이 존재하지 않습니다!");
    }
    checkPassword(password, postInfo.password);
    console.log("SUCCESS!!!!");

    await Post.remove(postInfo);
  } catch (error: any) {
    throw error;
  }
};
