export class TablSelection {
  constructor() {
    this.group = [];
  }

  select($el) {
    this.group.push($el);
    $el.addClass('selected');
  }

  selectGroup() {}
}
