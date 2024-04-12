import { IsNotEmpty, IsString, IsInt, Matches, MaxLength, MinLength } from "class-validator";

export class LessonDto {
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    @IsNotEmpty()
    @Matches(/^[ㄱ-ㅎ가-힣]*$/, {
        message: '이름은 한글만 가능합니다. 다시 확인하여 주십시오'
    })
    userName : string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(010)-?\d{4}-?\d{4}$/, {
        message: '휴대폰 번호 형식이 올바르지 않습니다. 다시 확인하여 주십시오'
    })
    userPhone : string;

    @IsString()
    @MinLength(2)
    @MaxLength(10)
    @IsNotEmpty()
    @Matches(/^[ㄱ-ㅎ가-힣]*$/, {
        message: '이름은 한글만 가능합니다. 다시 확인하여 주십시오'
    })
    coachName : string;

    @IsNotEmpty()
    dayOfWeek : string []

    @IsString()
    @IsNotEmpty()
    lessonTime : string []

    @IsNotEmpty()
    startDate : Date;

    @IsInt()
    @IsNotEmpty()
    @Matches(/[1-3]/, {
        message: '횟수는 1회부터 3회만 선택 가능합니다. 다시 확인하여 주십시오'
    })

    @IsNotEmpty()
    number : number;

    @IsInt()
    @IsNotEmpty()
    @Matches(/^(60|30)$/, {
        message: '타임은는 30분과 60분만 선택 가능합니다. 다시 확인하여 주십시오'
    })

    @IsNotEmpty()
    time : number;

}