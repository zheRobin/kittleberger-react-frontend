from rest_framework import status
from lxml import etree as ET
import time
ATTRIBUTES_XPATH = ET.XPath('.//attribute')
LINKED_PRODUCTS_XPATH = ET.XPath('.//linked_products/product')
LINKED_PRODUCT_ATTRIBUTES_XPATH = ET.XPath('.//attributes/attribute')
VALUE_XPATH = ET.XPath('./value/text()')

def convert(element):
    attributes = {attribute.get('ukey'): VALUE_XPATH(attribute) for attribute in ATTRIBUTES_XPATH(element)}

    linked_products = [{'id': product.get('id'), 
                        'name': product.get('name'), 
                        'mfact_key': product.get('mfact_key'), 
                        'attributes': {product_attr.get('ukey'): VALUE_XPATH(product_attr) for product_attr in LINKED_PRODUCT_ATTRIBUTES_XPATH(product)} } 
                       for product in LINKED_PRODUCTS_XPATH(element)]
    result = {
        'id': element.get('id'), 
        'name': element.get('name'), 
        'linked_products': linked_products
    }

    result.update(attributes)
    return result
def success(self, data):
    response = {
        "data":data,
        "status" : "success",
        "code"   : status.HTTP_200_OK
    }
    return response

def error(self, data):
    response = {
        "data":data,
        "status" :"failed",
        "code"   : status.HTTP_400_BAD_REQUEST
    }
    return response
def stream(cursor, field):
    for document in cursor:
        if field in document and document[field] is not None:  # Add this check
            for url in document[field]:
                yield url+'\n'