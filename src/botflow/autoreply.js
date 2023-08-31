const autoReply = () => {

    const step = -1;

    if (step === 0) {
        return 'What are your academic goals this semester?';
    }else if (step === 1) {
        return 'What grades are you aiming in your courses?';
    }else {
        return '';
    }

}

module.exports = autoReply;
