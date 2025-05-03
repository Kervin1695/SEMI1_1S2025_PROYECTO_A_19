import json
import base64
import boto3

# Inicializar clientes
rekognition = boto3.client('rekognition', region_name='us-east-1')
dynamodb = boto3.client('dynamodb', region_name='us-east-1')

def lambda_handler(event, context):
    if isinstance(event.get('body'), str):
            event = json.loads(event['body'])
    
    try:
        
        name = event.get('name')
        image_base64 = event.get('image')
        
        # Validar parámetros
        if not name or not image_base64:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Missing required parameters: 'name' or 'image'."})
            }

        # Decodificar imagen desde base64
        if "," in image_base64:
            try:
                image_binary = base64.b64decode(image_base64.split(",")[1])
            except IndexError:
                return {
                    "statusCode": 400,
                    "body": json.dumps({"message": "Invalid image data format."})
                }
        else:
            try:
                image_binary = base64.b64decode(image_base64)
            except Exception as e:
                return {
                    "statusCode": 400,
                    "body": json.dumps({"message": "Error decoding the base64 image.", "error": str(e)})
                }
        # Buscar rostros en la colección de Rekognition
        response = rekognition.search_faces_by_image(
            CollectionId='loginProfile',
            Image={'Bytes': image_binary}
        )

        matched_person = None
        confidence_level = None

        for match in response.get('FaceMatches', []):
            face_id = match['Face']['FaceId']
            confidence = match['Face']['Confidence']

            # Consultar DynamoDB
            face = dynamodb.get_item(
                TableName='loginProfileTable',
                Key={'RekognitionId': {'S': face_id}}
            )

            if 'Item' in face:
                matched_person = face['Item']['FullName']['S']
                confidence_level = round(confidence, 2)

                if name.lower() == matched_person.lower():
                    return {
                        "statusCode": 200,
                        "body": json.dumps({
                            "message": "Person matched successfully.",
                            "FullName": matched_person,
                            "Confidence": confidence_level
                        })
                    }
                else:
                    return {
                        "statusCode": 400,
                        "body": json.dumps({
                            "message": "Name mismatch. The name provided does not match the recognized person.",
                            "FullName": matched_person,
                            "Confidence": confidence_level
                        })
                    }

        return {
            "statusCode": 404,
            "body": json.dumps({"message": "Person cannot be recognized."})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Error processing the image", "error": str(e)})
        }
