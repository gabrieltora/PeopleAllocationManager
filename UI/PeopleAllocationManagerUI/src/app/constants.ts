import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

@Injectable()
export class AppConfig {
    public static readonly AUTH_STORAGE_KEY = 'auth';
    public static readonly REFRESH_TOKEN_STORAGE_KEY = 'refresh-token';
}

