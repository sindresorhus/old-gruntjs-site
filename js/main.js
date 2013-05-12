/*global jQuery, _, List */
(function (win, $) {
	'use strict';

	$(function () {
		$.getJSON('http://grunt-plugin-list.herokuapp.com', function (modules) {
			// only show plugins created after the specified date
			modules = _.filter(modules, function (el) {
				return Date.parse(el.time.created) > new Date('1800-01-01');
			});

			var latestModules = _.sortBy(modules, function (el) {
				return -Date.parse(el.time.created);
			}).splice(0, 5);

			var allModules = _.sortBy(modules, function (el) {
				// removing `grunt-` since some plugins don't contain it
				return el.name.replace('grunt-', '');
			});

			var latestTpl = _.template($('#plugins-latest-template').html(), {
				modules: latestModules
			});

			var allTpl = _.template($('#plugins-all-template').html(), {
				modules: allModules
			});

			$('#loading').remove();
			$('#plugins-latest').append(latestTpl);
			$('#plugins-all').append(allTpl).find('.search').show();

			new List('plugins-all', {
				valueNames: [
					'name',
					'desc',
					'author',
					'modified'
				]
			});

			$('#plugins-all .modified time').timeago();
		});
	});
})(window, jQuery);
