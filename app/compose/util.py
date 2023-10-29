def event_stream(data): 
    for e in data:
        yield f"data:{e}\n\n"