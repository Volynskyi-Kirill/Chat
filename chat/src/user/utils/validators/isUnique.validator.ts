// import {
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationArguments,
// } from 'class-validator';
// import { Injectable } from '@nestjs/common';
// import { UserService } from '../../user.service';

// @Injectable()
// @ValidatorConstraint({ name: 'IsUnique', async: true })
// export class IsUniqueConstraint implements ValidatorConstraintInterface {
//   constructor(private readonly service: UserService) {}

//   async validate(value: any, args: ValidationArguments) {
//     const fieldName: string = args.constraints[0]; // Получаем имя поля из аргументов
//     // const fieldExists = await this.service.exists({ [fieldName]: value });
//     // return !fieldExists;
//     return true;
//   }

//   defaultMessage(args: ValidationArguments) {
//     const fieldName: string = args.constraints[0]; // Получаем имя поля из аргументов
//     return `${fieldName} must be unique`;
//   }
// }
