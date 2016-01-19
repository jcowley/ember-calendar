import hbs from 'htmlbars-inline-precompile';
import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import moment from 'moment';

import {
  timeSlotHeight,
  dayWidth,
  selectTime,
  resizeOccurrence,
  dragOccurrence,
  selectTimeZone
} from 'ember-calendar/test-helpers/all';

moduleForComponent('as-calendar', 'AsCalendarComponent', {
  integration: true,

  beforeEach: function() {
    this.set('occurrences', Ember.A());

    this.on('calendarAddOccurrence', (occurrence) => {
      this.get('occurrences').pushObject(occurrence);
    });

    this.on('calendarRemoveOccurrence', (occurrence) => {
      this.get('occurrences').removeObject(occurrence);
    });

    this.on('calendarUpdateOccurrence', (occurrence, properties) => {
      occurrence.setProperties(properties);
    });
  }
});

test('Add an occurrence', function(assert) {
  this.render(hbs`
    {{as-calendar
      title="Ember Calendar"
      occurrences=occurrences
      dayStartingTime="9:00"
      dayEndingTime="18:00"
      timeSlotDuration="00:30"
      onAddOccurrence=(action "calendarAddOccurrence")
      onUpdateOccurrence=(action "calendarUpdateOccurrence")
      onRemoveOccurrence=(action "calendarRemoveOccurrence")}}
  `);

  assert.equal(Ember.$('.as-calendar-occurrence').length, 0,
    'it shows an empty calendar'
  );

  selectTime({ day: 0, timeSlot: 0 });

  assert.equal(Ember.$('.as-calendar-occurrence').length, 1,
    'it adds the occurrence to the calendar'
  );
});

test('Remove an occurrence', function(assert) {
  this.render(hbs`
    {{as-calendar
      title="Ember Calendar"
      occurrences=occurrences
      dayStartingTime="9:00"
      dayEndingTime="18:00"
      timeSlotDuration="00:30"
      onAddOccurrence=(action "calendarAddOccurrence")
      onUpdateOccurrence=(action "calendarUpdateOccurrence")
      onRemoveOccurrence=(action "calendarRemoveOccurrence")}}
  `);

  selectTime({ day: 0, timeSlot: 0 });

  assert.equal(Ember.$('.as-calendar-occurrence').length, 1,
    'it adds the occurrence to the calendar'
  );

  Ember.run(() => {
    Ember.$('.as-calendar-occurrence .as-calendar-occurrence__remove').click();
  });

  assert.equal(Ember.$('.as-calendar-occurrence').length, 0,
    'it removes the occurrence from the calendar'
  );
});


test('Resize an occurrence', function(assert) {
  this.render(hbs`
    {{as-calendar
      title="Ember Calendar"
      occurrences=occurrences
      dayStartingTime="9:00"
      dayEndingTime="18:00"
      timeSlotDuration="00:30"
      defaultOccurrenceDuration="00:30"
      onAddOccurrence=(action "calendarAddOccurrence")
      onUpdateOccurrence=(action "calendarUpdateOccurrence")
      onRemoveOccurrence=(action "calendarRemoveOccurrence")}}
  `);

  selectTime({ day: 0, timeSlot: 0 });

  assert.equal(Ember.$('.as-calendar-occurrence').length, 1,
    'it adds the occurrence to the calendar'
  );

  resizeOccurrence(Ember.$('.as-calendar-occurrence'), { timeSlots: 2 });

  assert.equal(Ember.$('.as-calendar-occurrence').height(), timeSlotHeight() * 3,
    'it resizes the occurrence');
});

test('Drag an occurrence', function(assert) {
  this.render(hbs`
    {{as-calendar
      title="Ember Calendar"
      occurrences=occurrences
      dayStartingTime="9:00"
      dayEndingTime="18:00"
      timeSlotDuration="00:30"
      onAddOccurrence=(action "calendarAddOccurrence")
      onUpdateOccurrence=(action "calendarUpdateOccurrence")
      onRemoveOccurrence=(action "calendarRemoveOccurrence")}}
  `);

  selectTime({ day: 0, timeSlot: 0 });

  assert.equal(this.$('.as-calendar-occurrence').length, 1,
    'it adds the occurrence to the calendar'
  );

  dragOccurrence(this.$('.as-calendar-occurrence'), { days: 2, timeSlots: 4 });

  var $occurrence = this.$('.as-calendar-occurrence');

  var dayOffset = Math.floor($occurrence.offset().left -
    this.$('.as-calendar-timetable-content').offset().left);

  var timeSlotOffset = Math.floor($occurrence.offset().top -
    this.$('.as-calendar-timetable-content').offset().top);

  assert.equal(dayOffset, Math.floor(dayWidth() * 2),
    'it drags the occurrence to the correct day'
  );

  assert.equal(timeSlotOffset, timeSlotHeight() * 4,
    'it drags the occurrence to the correct timeslot'
  );

  assert.equal($occurrence.height(), timeSlotHeight() * 2,
    'it keeps the duration of the occurrence'
  );
});

test('Change time zone', function(assert) {
  this.get('occurrences').pushObject(
    Ember.Object.create({
      startsAt: moment().utc().startOf('day').add(9, 'hours'),
      endsAt: moment().utc().startOf('day').add(10, 'hours'),
      title: 'Example Occurrence'
    })
  );

  this.render(hbs`
    {{as-calendar
      title="Ember Calendar"
      occurrences=occurrences
      timeZone="UTC"
      dayStartingTime="9:00"
      dayEndingTime="18:00"
      timeSlotDuration="00:30"
      defaultTimeZoneQuery="Rome"
      onAddOccurrence=(action "calendarAddOccurrence")
      onUpdateOccurrence=(action "calendarUpdateOccurrence")
      onRemoveOccurrence=(action "calendarRemoveOccurrence")}}
  `);

  assert.equal(Ember.$('.as-calendar-occurrence').position().top, 0,
    'it shows the occurrence in the UTC time zone');

  selectTimeZone('Rome');

  assert.equal(Ember.$('.as-calendar-occurrence').position().top, timeSlotHeight() * 2,
    'it shows the occurrence in the Rome time zone');
});
