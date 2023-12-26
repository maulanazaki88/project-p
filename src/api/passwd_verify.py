# Rakhman_22SA11A176
def verify_password(password):

    symbol = ("!", "@", "#", "$", "%", "^", "&", "*",
              "(", ")", "_", "+", "[", "]", "/", "?")

    for character in password:
        has_lower = False
        has_lower = False
        has_digit = False
        has_symbol = False

        if character.islower():
            has_lower = True

        if character.isupper():
            has_upper = True

        if character in ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"):
            has_digit = True

        if character in symbol:
            has_symbol = True

    return has_digit


print(verify_password("Nyoba123!"))
