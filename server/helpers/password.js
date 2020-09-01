const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

function validatePassword(password) {
    if (!regex.test(password)) {
        throw new Error('Password tidak sesuai kriteria');
    }

    return true;
}

module.exports = { validatePassword };
