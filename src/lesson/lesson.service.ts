import { Injectable } from '@nestjs/common';
import { CoachDto } from './dto/coach.dto'
import { LessonDto } from './dto/lesson.dto'
import { LessonSearchRepository } from './repository/lessonSearchRepository.repository';
import { LessonApplyRepository } from './repository/lessonApplyRepository.repository';

@Injectable()
export class LessonService {
    constructor(
        private readonly lessonSearchRepository: LessonSearchRepository,
        private readonly lessonApplyRepository: LessonApplyRepository
    ){}

    async getCoach(CoachDto: CoachDto): Promise<{success : boolean, result : any[]}> {
        try {
            const resultList= this.lessonSearchRepository.getCoachTime(CoachDto);
            
            return  { success: true, result: (await resultList).result};;
        } catch (error) {
            console.error("An error occurred:", error);
            return { success: false, result: []};
        }
    }

    async applyLesson(LessonDto: LessonDto) {
        return this.lessonApplyRepository.lessonApply(LessonDto);
    }
}

