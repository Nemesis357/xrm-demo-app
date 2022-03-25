import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "./post";

export interface dataServiceInterface {
    getPosts(): Observable<Post[]>
}