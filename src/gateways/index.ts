import { ResponseWeatherType, SearchType } from '@/pages/Home/schema';
import { Api } from './axios';

export class SearchGateway {
   constructor(private api: typeof Api) { }

   async get(data: SearchType): Promise<ResponseWeatherType> {
      const response = await this.api.put('search', { data });
      return response.data;
   }
}