import { Injectable } from '@nestjs/common';
import {getRepository, Brackets, getConnection} from 'typeorm';
import { ExcelFileEntity } from './entity/excelfile.entity';
import { ExcelFileDataEntity } from './entity/exelfiledata.entity';
import { ReviewLogsEntity } from './entity/reviewlogs.entity'
import {verify} from "./helper/jwtutility";
const xlsx = require('xlsx');

@Injectable()
export class FileUploadService {
    public async uploadExcelFileService(file, body,  response): Promise<any> {
        const ExcelFileModel = getRepository(ExcelFileEntity);
        const ExcelFileDataModel = getRepository(ExcelFileDataEntity);
        let fileName = `${Date.now()}-${file.originalname}`
            //uploadfile
        const data ={
            filename: fileName
        }
        await ExcelFileModel.save(data).then((res)=>{
            if (res){
                const excelFileId = res.id
                const workbook = xlsx.read(file.buffer, {
                    type: 'buffer',
                    cellText: true,
                    cellDates: true,
                });

                const sheet_name_list = workbook.SheetNames;
                const sheet_data = xlsx.utils.sheet_to_json(
                    workbook.Sheets[sheet_name_list[0]],
                    { raw: false, dateNF: 'yyyy-mm-dd', rawNumbers: false },
                );
                sheet_data.forEach((data)=>[
                    data.excelFileId = excelFileId
                ])

                ExcelFileDataModel.save(sheet_data).then((res)=>{
                    if(res) {
                        response.status(201).send({
                            data: null,
                            message: 'filename uploaded',
                        });
                    }
                })
            }
        })
    return  true

    }
    public async getExcelFilesService( response): Promise<any> {
        const ExcelFileModel = getRepository(ExcelFileEntity);

        await ExcelFileModel.find().then((res)=>{
            if (res){
                response.status(201).send({
                    data: res,
                    message: 'success',
                });

            }
        })
        return  true

    }
    public async getExcelFileService( id,  response, request): Promise<any> {

        const ExcelFileModel = getRepository(ExcelFileEntity);
        const ReviewLogsDataModel = getRepository(ReviewLogsEntity);
        const ExcelFileDataModel = getRepository(ExcelFileDataEntity);
        let userid = ''
        verify(request.headers.authorization, async (err, decoded) => {
            if (decoded) {
                 userid= decoded.id
            }
        });
        await ExcelFileModel.find({
            where: {
                id: id,
            },
        }).then(async (res)=>{
            if (res){
                // @ts-ignore
                // @ts-ignore
                let data = res[0]
                // @ts-ignore
                data.lastAccessAt = Date.now()
                ExcelFileModel.save(data)
                let reviewdata = {
                    userId: userid,
                    fileId: id
                }
                // @ts-ignore

                  // @ts-ignore
                let excelFileData = await ExcelFileDataModel.find(
                    {
                        where: {
                            excelFileId: id
                        }
                    }
                )
               let logData =  await ReviewLogsDataModel.find({
                    where: {
                        userId: userid,
                        fileId: id
                    },
                })
                if(logData.length >0) {
                    // @ts-ignore
                    const logId = logData.id
                    // @ts-ignore
                    // @ts-ignore
                   logData[0].reviewedAt = Date.now()
                     ReviewLogsDataModel.save(logData)
                        .then((res)=>{
                    })
                }
                // @ts-ignore
                else {
                    // @ts-ignore
                    await ReviewLogsDataModel.save(reviewdata)
                }
                response.status(201).send({
                    data: excelFileData,
                    message: 'success',
                });

            }
        })
        return  true

    }
    public async deleteExcelFileService( id,  response, request): Promise<any> {

        const ExcelFileModel = getRepository(ExcelFileEntity);
        const ExcelFileDataModel = getRepository(ExcelFileDataEntity);
        await ExcelFileModel.delete({
                id: id,
        }).then(async (res)=>{
            if (res){
                // @ts-ignore
                await ExcelFileDataModel.delete({
                    // @ts-ignore
                    excelFileId: id,
                })
                response.status(201).send({
                    data: res,
                    message: 'success',
                });

            }
        })
        return  true

    }
}


