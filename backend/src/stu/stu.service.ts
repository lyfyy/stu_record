import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Post } from 'src/interfaces/post.interface';
import { CreatePostDTO } from 'src/dto/create-post.dto';

@Injectable()
export class StuService {
  constructor(@Inject('stuModel') private readonly stuModel: Model<any>) {}

  async getRecord(body: any): Promise<Post[]> {
    const { sort } = body;
    const res = await this.stuModel.find().sort(sort);
    return res;
  }

  async PostRecord(createPostDTO: any): Promise<any> {
    console.log('-=-=-=-==-');
    console.log('this.stuModel', this.stuModel);
    const post = await this.stuModel.create(createPostDTO);
    console.log('post', post);

    return post;
  }

  async addPost(createPostDTO: any): Promise<any> {
    // return null;
    const newPost = await this.stuModel.create(createPostDTO);
    return newPost;
  }

  async editPost(stuNo, name, stuRecord: any): Promise<any> {
    console.log('stuRecord', stuRecord);
    // 根据传入的stuNo和name查数据库中对应的ID
    const id = await this.stuModel.findOne({ name }).select('_id');
    console.log('id', id);
    if (!id) throw new Error('未找到对应的学生信息');
    // 计算score的值，根据传入的stuRecord的值，一个true为1，一个false为0
    const score =
      (stuRecord.score1 ? 1 : 0) +
      (stuRecord.score2 ? 1 : 0) +
      (stuRecord.score3 ? 1 : 0);

    Object.assign(stuRecord, { score });
    const editedPost = await this.stuModel.findByIdAndUpdate(id, stuRecord, {
      new: true,
    });
    return editedPost;
  }

  async deletePost(postID): Promise<any> {
    const deletedPost = await this.stuModel.findByIdAndRemove(postID);
    return deletedPost;
  }

  // search方法，根据传入的参数模糊搜索数据库
  async search(body: any): Promise<any> {
    console.log('body', body);
    const { name } = body;
    const res = await this.stuModel.find({
      name: { $regex: name },
    });
    console.log('res', res);
    return res;
  }

  // 读取public目录下的表格并保存在数据库中
  async import(): Promise<any> {
    const fs = require('fs');
    const path = require('path');
    const xlsx = require('node-xlsx');
    const sheets = xlsx.parse(
      fs.readFileSync(path.join(process.cwd() + '/', `public/students.xlsx`)),
    );
    console.log('sheets', sheets);
    const data = sheets[0].data;
    console.log('data', data);
    const keys = data.shift();
    console.log('keys', keys);
    const res = data.map((item) => {
      const obj = {};
      keys.forEach((key, index) => {
        obj[key] = item[index];
      });
      return obj;
    });
    console.log('res', res);
    const result = await this.stuModel.insertMany(res);
    console.log('result', result);
    return result;
  }
}
