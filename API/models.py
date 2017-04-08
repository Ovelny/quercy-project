from django.db import models

# an "id" field is automatically created by django every time.

# -- Property

class Property(models.Model): 
    VENTE = "V"
    LOCATION = "L"
    TYPE_CHOICES = (
        (VENTE, "Vente"),
        (LOCATION, "Location")
    )
    advert_type = models.CharField(
        max_length=1,
        choices = TYPE_CHOICES
    )
    LIBRE = "L"
    OCCUPE = "O"
    EN_ATTENTE = "A"
    STATE_CHOICES = (
        (LIBRE, 'Libre'),
        (OCCUPE, 'Occupé'),
        (EN_ATTENTE, 'En attente'),
    )
    state = models.CharField(
        max_length=1,
        choices=STATE_CHOICES
    )
    title_fr = models.CharField(max_length=30)
    title_en = models.CharField(max_length=30)
    description_fr = models.TextField()
    description_en = models.TextField()
    nb_rooms = models.IntegerField() #redundant ?
    price = models.DecimalField(max_digits=11, decimal_places=2)
    address = models.CharField(max_length=64)
    postal_code = models.CharField(max_length=10)
    city = models.CharField(max_length=32)
    living_surface = models.DecimalField(max_digits=6, decimal_places=2)
    total_surface = models.DecimalField(max_digits=6, decimal_places=2)
    construction_year = models.IntegerField(blank=True, null=True) 
    # blank=True: allow empty value
    # null=True: store empty values as null in DB
    nb_floors = models.IntegerField()
    energy_consumption = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    gas_emission = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    is_favorite = models.BooleanField()
    # Foreign keys
    property_type = models.ForeignKey("Property_Type", on_delete=models.PROTECT)
    heating_type = models.ForeignKey("Heating_Type", on_delete=models.PROTECT)
    kitchen_type = models.ForeignKey("Kitchen_Type", on_delete=models.PROTECT)
    # Many-to-many relations
    rooms = models.ManyToManyField("Room", through="Property_Room") 
    # propriété through : utiliser la classe définie ci-après pour stocker les données. 
    # Nécessaire car on veut avoir la propriété "nb" sur la lisaison.

class Picture(models.Model):
    prop = models.ForeignKey("Property", related_name='pictures', on_delete=models.CASCADE)
    display_order = models.IntegerField() 
    # file will be uploaded to MEDIA_ROOT/uploads
    picture = models.ImageField(upload_to="uploads/")

    def __unicode__(self):
        return 'aaa'

# Receive the post_delete signal and delete the file associated with the model instance.
from django.db.models.signals import post_delete
from django.dispatch.dispatcher import receiver

@receiver(post_delete, sender=Picture)
def picture_delete(sender, instance, **kwargs):
    # Pass false so FileField doesn't save the model.
    instance.picture.delete(False)


class Property_Type(models.Model):
    label = models.CharField(max_length=20, unique=True)

class Heating_Type(models.Model):
    label = models.CharField(max_length=20, unique=True)

class Kitchen_Type(models.Model):
    label = models.CharField(max_length=20, unique=True)

class Room(models.Model):
    room_type = models.CharField(max_length=20, unique=True)

class Property_Room(models.Model):
    prop = models.ForeignKey(Property, on_delete=models.CASCADE) #property est un mot réservé, donc prop.
    room = models.ForeignKey(Room, on_delete=models.PROTECT)
    nb = models.IntegerField()
    class Meta:
        unique_together = ('prop', 'room')

# -- Customer

class Customer(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    address = models.CharField(max_length=64)
    postal_code = models.CharField(max_length=10)
    city = models.CharField(max_length=32)
    phone_number = models.CharField(max_length=10, blank=True)
    mobile_phone = models.CharField(max_length=10, blank=True) 
    email_address = models.CharField(max_length=32, blank=True)
    # Many-to-many fields
    visit_reports = models.ManyToManyField("Property", through="Visit_Report", related_name="visits")
    estimates = models.ManyToManyField("Property", through="Estimate", related_name="estimates")
    # related_name = "The name to use for the relation from the related object back to this one."

class Visit_Report(models.Model):
    prop = models.ForeignKey(Property, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    date = models.DateField()
    comments = models.TextField()

class Estimate(models.Model):
    prop = models.ForeignKey(Property, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    request_date = models.DateField()
    creation_date = models.DateField(blank=True, null=True)
    estimated_amount = models.DecimalField(max_digits=11, decimal_places=2)

# -- Other tables

class Company_Info(models.Model):
    company_presentation_fr = models.TextField()
    company_presentation_en = models.TextField()
