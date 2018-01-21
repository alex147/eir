import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Site } from './site';

@Injectable()
export class SiteService {

    constructor(private http: HttpClient) { }

    getAllSites (): Observable<Site[]> {
        return this.http.get<Array<Site>>('/api/sites');
    }

    addSite (site: Site): Observable<Site> {
        return this.http.post<Site>('/api/sites/', site)
            .map((data: any) => console.log(data))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateSite (site: Site): Observable<Site> {
        return this.http.put<Site>('/api/sites/' + site.id, site)
            .map((data: any) => console.log(data))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    removeSite (id: string): Observable<Site> {
        return this.http.delete<Site>('/api/sites/' + id)
            .map((data: any) => console.log(data))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
