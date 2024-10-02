import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './schemas/course.schema';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Post()
    create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    findAll(@Query('page') page: string, @Query('limit') limit: string): Promise<{ courses: Course[]; total: number }> {
        return this.coursesService.findAll(Number(page), Number(limit));
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Course> {
        return this.coursesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: CreateCourseDto): Promise<Course> {
        return this.coursesService.update(id, updateCourseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Course> {
        return this.coursesService.remove(id);
    }
}