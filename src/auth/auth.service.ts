import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) { }

  async handleAuth(authDTO: AuthDto) {
    try {
      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const responseData = await lastValueFrom(
        this.httpService
          .post(
            'LINK_TO_AUTHORIZATION_SERVICE',
            { consentArtifact: authDTO.consentArtifact, gql: authDTO.gql },
            requestOptions,
          )
          .pipe(map((response) => response.data)),
      );

      return responseData;
    } catch (err) {
      console.log('err: ', err);
      throw new InternalServerErrorException();
    }
  }
}
