import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component sucessfully create', () => {
    expect(component).toBeTruthy();
  });

  it("testing title",() =>{
    expect(component.componentName).toBe("footer")
  });
  it('should match footer html class name',((done: DoneFn) =>{
    const footer = fixture.debugElement.query(By.css('.site-footer'));
    fixture.detectChanges();
    expect(footer).toBeTruthy();

    const footer1 = fixture.debugElement.query(By.css('.container'));
    fixture.detectChanges();
    expect(footer1).toBeTruthy();

    const footer2 = fixture.debugElement.query(By.css('.row'));
    fixture.detectChanges();
    expect(footer2).toBeTruthy();

    const footer3 = fixture.debugElement.query(By.css('.social-icons'));
    fixture.detectChanges();
    expect(footer3).toBeTruthy();

    const footer4 = fixture.debugElement.query(By.css('.facebook'));
    fixture.detectChanges();
    expect(footer4).toBeTruthy();

    const footer5 = fixture.debugElement.query(By.css('.twitter'));
    fixture.detectChanges();
    expect(footer5).toBeTruthy();

    const footer6 = fixture.debugElement.query(By.css('.dribbble'));
    fixture.detectChanges();
    expect(footer5).toBeTruthy();
    

    done();
    

  }));
  
  it('should have a defined component', () =>{
    expect(component).toBeDefined();
});


});
