import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { HttpClientTestingModule} from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';

import { ComplaintService } from './complaint.service';
import { HttpClient } from '@angular/common/http';

describe('ComplaintService', () => {
  let service: ComplaintService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ComplaintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
