import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Site } from './site';

@Injectable()
export class SiteService {

    constructor(private http: HttpClient) { }

    getAllSites (): Observable<Site[]> {
        return this.http.get<Array<Site>>('/api/sites');
    }

    addSite (site: Site): Observable<Site> {
        return this.http.post<Site>('/api/sites/', site);
    }

    updateSite (site: Site): Observable<Site> {
        return this.http.put<Site>('/api/sites/' + site.id, site);
    }

    removeSite (id: string): Observable<Site> {
        return this.http.delete<Site>('/api/sites/' + id);
    }

}
