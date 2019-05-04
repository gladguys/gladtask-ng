import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

	constructor(private http: HttpClient) {}

	getMockData() {
		return this.http.get('../assets/mock.json');
	}
}
