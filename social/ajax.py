from dajax.core import Dajax
from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from dajaxice.utils import deserialize_form

@dajaxice_register
def like_status(request, id, name):
    user = request.user