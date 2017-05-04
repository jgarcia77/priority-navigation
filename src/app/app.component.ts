import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Priority Navigation';

  $nav: any;
  $btn: any;
  $vlinks: any;
  $hlinks: any;

  breaks: any = [];

  toggle() {
    this.$hlinks.toggleClass('hidden');
  }

  ngAfterContentInit() {
    this.$nav = $('.greedy-nav');
    this.$btn = $('.greedy-nav button');
    this.$vlinks = $('.greedy-nav .visible-links');
    this.$hlinks = $('.greedy-nav .hidden-links');

    this.updateNav();

    $(window).resize(()=> {
        this.updateNav();
    });
  }

  
  updateNav() {
    var availableSpace = this.$btn.hasClass('hidden') ? this.$nav.width() : this.$nav.width() - this.$btn.width() - 30;

    // The visible list is overflowing the nav
    if(this.$vlinks.width() > availableSpace) {

      // Record the width of the list
      this.breaks.push(this.$vlinks.width());

      // Move item to the hidden list
      this.$vlinks.children().last().prependTo(this.$hlinks);

      // Show the dropdown btn
      if(this.$btn.hasClass('hidden')) {
        this.$btn.removeClass('hidden');
      }

    // The visible list is not overflowing
    } else {

      // There is space for another item in the nav
      if(availableSpace > this.breaks[this.breaks.length-1]) {

        // Move the item to the visible list
        this.$hlinks.children().first().appendTo(this.$vlinks);
        this.breaks.pop();
      }

      // Hide the dropdown btn if hidden list is empty
      if(this.breaks.length < 1) {
        this.$btn.addClass('hidden');
        this.$hlinks.addClass('hidden');
      }
    }

    // Keep counter updated
    this.$btn.attr("count", this.breaks.length);

    // Recur if the visible list is still overflowing the nav
    if(this.$vlinks.width() > availableSpace) {
      this.updateNav();
    }

  }
}
