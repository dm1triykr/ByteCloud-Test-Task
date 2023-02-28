
$(document).foundation();

$(function() {
var storageSlider = $('#storageSlider');
var transferSlider = $('#transferSlider');
var progressBars = $('.progress');
var optionBtns = $('.providers__radio-button');

optionBtns.on('change', function(e) {
    var relatedProgress = $(this).data('related-progress'),
        optionValue = $(this).data('value'),
        optionName = $(this).attr('name');
        console.log(optionName);

    if ($('#' + relatedProgress).length) {
        if(optionName == 'storage-bunny') {
            var optionReplacingName = optionName.replace('-bunny', "");
            $('#' + relatedProgress).data(optionReplacingName + '-modifier', optionValue);
            updateOutputsAndProgressBars();
        } else {
            var optionReplacingName = optionName.replace('-scaleway', "");
            $('#' + relatedProgress).data(optionReplacingName + '-modifier', optionValue);
            updateOutputsAndProgressBars();
        }
    }
});

// Listen for the changed.zf.slider event on both sliders
storageSlider.on('changed.zf.slider', function(e, handle) {
    updateOutputsAndProgressBars();
});

transferSlider.on('changed.zf.slider', function(e, handle) {
    updateOutputsAndProgressBars();
});

// Update the outputs and progress bars based on the current slider values
function updateOutputsAndProgressBars() {
    var storageValue = storageSlider.find('.slider-handle').attr('aria-valuenow');
    var transferValue = transferSlider.find('.slider-handle').attr('aria-valuenow');
    var maxValue = 100;

    // Update the progress bars based on the percentage of total storage and transfer values
    progressBars.each(function(index, progressBar) {
        var storageModifier = $(progressBar).data('storage-modifier');
        var transferModifier = $(progressBar).data('transfer-modifier');
        var totalValue = storageValue * storageModifier + transferValue * transferModifier;

        if (totalValue > maxValue) {
            var width = (totalValue / maxValue) * 100;
        } else {
            var width = (totalValue / maxValue) * 100;
        }

        $(progressBar).find('.progress-meter').css('width', width + '%');
        $(progressBar).find('.progress-price').html('$'+totalValue.toFixed(2));
    });
}
});
