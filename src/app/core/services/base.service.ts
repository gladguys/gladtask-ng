import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseModel } from 'src/app/shared/models/base.model';
import { User } from 'src/app/shared/models/user.model';

export abstract class BaseService<T extends BaseModel> {

    protected http: HttpClient;

    protected constructor(protected injector: Injector, protected pathToApi: string) {
        this.http = this.injector.get(HttpClient);
    }

    findById(id: string): Observable<T> {
		return this.http.get<T>(environment.API + this.pathToApi + `/${id}`);
    }
    
    createOrUpdate(t: T): Observable<T> {
		if(t.id != null && t.id != '') {
			return this.http.put<T>(environment.API + this.pathToApi, t);
		} else {
			return this.http.post<T>(environment.API + this.pathToApi, t);
		}
    }
    
    findAll() {
		return this.http.get<T[]>(environment.API + this.pathToApi);
    }

    findByTeam(teamId: string): Observable<User[]> {
      return this.http.get<User[]>(environment.API + this.pathToApi + `/team/${teamId}`);
    }
    
    delete(id: string) {
		return this.http.delete(environment.API + this.pathToApi + `/${id}`);
	}
}