import { ExceptionFilter, Logger, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common"

@Catch()
export class AllExceptionFilter implements ExceptionFilter{
    private readonly logger = new Logger (AllExceptionFilter.name)

    catch (exception: any , host:ArgumentsHost){
        const ctx = host.switchToHttp(); // Contexto
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        // El Estado
        const status = exception instanceof HttpException 
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

        //El mensaje
        const msg = exception instanceof HttpException
        ? exception.getResponse()
        : exception;

        this.logger.error(` Status: ${status} Error: ${JSON.stringify(msg)}` );

        //la respuesta
        response.status(status).json({
            time: new Date().toISOString(),
            path: request.url,
            error: msg,

        })
    }
}