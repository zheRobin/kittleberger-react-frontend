from rest_framework import status

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

def convert(element):
    attributes_dict = {}
    linked_products_object_list = []

    for attribute in element.findall('attributes/attribute'):
        values = [value.text for value in attribute.findall('value')]
        attributes_dict[attribute.get('ukey')] = values

    linked_products = element.find('linked_products')
    if linked_products is not None:
        for product in linked_products.findall('product'):
            product_attributes = {}
            for product_attr in product.findall('attributes/attribute'):
                values = [value.text for value in product_attr.findall('value')]
                product_attributes[product_attr.get('ukey')] = values
            linked_product_object = {
                'id': product.get('id'),
                'name': product.findtext('name'),
                'mfact_key': product.findtext('mfact_key'),
                'attributes': product_attributes
            }
            linked_products_object_list.append(linked_product_object)

    output_object = {
            'id': element.get('id'),
            'name': element.findtext('name'),
            'attributes': attributes_dict,
            'linked_products': linked_products_object_list
        }
    return output_object
