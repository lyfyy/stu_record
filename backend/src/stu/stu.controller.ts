import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { StuService } from './stu.service';
import { CreatePostDTO } from 'src/dto/create-post.dto';

@Controller('stu')
export class StuController {
  constructor(private stuService: StuService) {}

  @Get()
  async get(@Res() res, @Query() query: any) {
    const result = await this.stuService.getRecord(query);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
      data: result,
    });
  }

  // 将public目录下的文件导入到数据库
  @Get('/import')
  async import(@Res() res) {
    await this.stuService.import();
    return res.status(HttpStatus.OK).json({
      message: 'import successfully!',
    });
  }

  @Put('/updateRecord')
  async updateRecord(@Res() res, @Body() body: any) {
    console.log('body', body);
    if (!body.name)
      return res.status(HttpStatus.OK).json({
        message: '姓名必填',
      });
    try {
      const newPost = await this.stuService.editPost(body.stuNo, body.name, {
        score1: body.score1 === 'true' ? true : false,
        score2: body.score2 === 'true' ? true : false,
        score3: body.score3 === 'true' ? true : false,
      });
      return res.status(HttpStatus.OK).json({
        message: '提交成功!',
        post: newPost,
      });
    } catch (err) {
      return res.status(HttpStatus.OK).json({
        message: '提交失败!',
        err: err.message,
      });
    }
  }

  // get请求，根据传入的参数模糊搜索
  @Get('/search')
  async search(@Res() res, @Query() query: any) {
    console.log('----');
    console.log('query', query);
    const result = await this.stuService.search(query);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
      data: result,
    });
  }
}
