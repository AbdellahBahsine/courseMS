import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
    constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const createdCourse = new this.courseModel(createCourseDto);
        return createdCourse.save();
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ courses: Course[]; total: number }> {
        const total = await this.courseModel.countDocuments().exec();
        const courses = await this.courseModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

        return { courses, total };
    }

    async findOne(id: string): Promise<Course> {
        return this.courseModel.findById(id).exec();
    }

    async update(id: string, updateCourseDto: CreateCourseDto): Promise<Course> {
        return this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Course> {
        const deletedCourse = await this.courseModel.findByIdAndDelete(id).exec();
        if (!deletedCourse) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }
        return deletedCourse;
    }
}