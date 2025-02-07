import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Directive({
  selector: '[hideElementOnNotParsedClaim]',
  standalone: true
})
export class HideElementOnNotParsedClaim implements OnInit {
  @Input("hideElementOnNotParsedClaim") claimReq!: Function;

  constructor(private authService: AuthService,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    const claims = this.authService.getClaims();

    if (!this.claimReq(claims))
      this.elementRef.nativeElement.style.display = "none";
  }

}
