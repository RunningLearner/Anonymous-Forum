import { Request, Response, NextFunction } from "express-serve-static-core";
import { BadRequestError } from "../utils/error/errors";
import * as postsService from "./postsService";

/**
 * 들아온 인자가 비어있는지 확인하는 함수
 */
const checkNull = (object: { [key: string]: any }) => {
  for (let prop in object) {
    if (object[prop] == null || typeof prop == "undefined") {
      throw new BadRequestError(`${prop}이/가 비었습니다!`);
    }
  }
};

/**
 * 게시글을 생성하는 api
 */
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, password } = req.body;
    checkNull({ title, content, password });

    await postsService.createPost(title, content, password);

    res.status(201).json({
      success: true,
      message: `게시글 작성이 완료되었습니다.`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 게시글들을 불러오는 api
 */
export const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, perPage } = req.query;
    checkNull({ page, perPage });

    const result = await postsService.getAllPost(Number(page), Number(perPage));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * 특정 게시글을 불러오는 api
 */
export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params;
    checkNull({ id });

    const result = await postsService.getPost(Number(id.id));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * 특정 게시글을 수정하는 api
 */
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, password } = req.body;
    const postId = req.params;
    checkNull({ postId, title, content, password });
    await postsService.updatePost(Number(postId.id), title, content, password);
    console.log("SUCCESS!!!!");

    res.status(200).json({
      success: true,
      message: `게시글 수정이 완료되었습니다.`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 특정 게시글을 삭제하는 api
 */
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    const postId = req.params;
    checkNull({ postId, password });

    await postsService.deletePost(Number(postId.id), password);

    res.status(200).json({
      success: true,
      message: `게시글 삭제가 완료되었습니다.`,
    });
  } catch (error) {
    next(error);
  }
};
