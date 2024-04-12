import { Controller, Post, Body, Get } from '@nestjs/common';
import { CoachDto } from './dto/coach.dto'
import { LessonService } from './lesson.service'
import { LessonDto } from './dto/lesson.dto';

@Controller('lesson')
export class LessonController {
    constructor( private LessonService : LessonService ){}

    @Post('/possibleList')
    async possibleList(@Body() CoachDto : CoachDto ) : Promise<{success : boolean, data : any[]}>{
        const result = await this.LessonService.getCoach(CoachDto);
        return { success: result.success, data: result.result };
    }

    @Post('/apply')
    async apply(@Body() LessonDto : LessonDto ){
        const result = await this.LessonService.applyLesson(LessonDto)
        return result;
    }
}