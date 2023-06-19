    /*   useEffect(() => {
        reference
          .ref('images')
          .listAll()
          .then(res => {
            setImages([]);
            res.items.forEach(async ref => {
              const imagePath = ref.fullPath; 
              console.log("ImagePath:");
              console.log(imagePath);// images/image-3920.jpeg
              
              const url = await reference.ref(imagePath).getDownloadURL();
              console.log("URL: ");
              console.log(url);
              
              const itemData = {
                imageName: imagePath,
                imageUrl: url,
              };
              setImages(prev => [...prev, itemData]);
            });
          });
      }, []); */