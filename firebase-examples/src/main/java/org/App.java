package org;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.FieldValue;
import com.google.common.collect.ImmutableMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public class App {
    public static void main( String[] args ) {
        String projectId = (args.length == 0) ? null : args[0];
        if (projectId == null) {
            throw new IllegalArgumentException("projectId unset");
        }
        
        boolean debug = true;
        
        // init firebase db
        FirestoreOptions firestoreOptions = 
            FirestoreOptions.getDefaultInstance().toBuilder()
                .setProjectId(projectId).build();
        Firestore db = firestoreOptions.getService();
        
        // get all documents in collections
        ApiFuture<QuerySnapshot> future = db.collection("users").get();
        try {
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                System.out.println(document.getData());
            }
        } catch (InterruptedException|ExecutionException e) {
            System.err.println(e);
        }
        
        // check if collections contain documentId
        // try{
        //     DocumentReference docRef = db.collection("users").document("alovelace");
        //     // asynchronously retrieve the document
        //     ApiFuture<DocumentSnapshot> future = docRef.get();
        //     // future.get() blocks on response
        //     DocumentSnapshot document = docRef.get();
        //     if(document.exists()){
        //         System.out.println("We get Doc alovelace");
        //     }else{
        //         System.out.println("We dont have Doc alovelace");
        //     }
        // }catch(InterruptedException|ExecutionException e ){
        //     System.err.println(e);
        // }
        
        
        // get collections.document all key-value pairs
            // try{
            //     DocumentReference docRef = db.collection("users").document("alovelace");
            //     //asynchronously retrieve the document
            //     ApiFuture<DocumentSnapshot> future = docRef.get();
            //     DocumentSnapshot document=future.get();
            //     if(document.exists()){
            //         System.out.println(document.getData());
            //     }else{
            //         System.out.println("We dont have Doc alovelace");
            //     }
            // }catch(InterruptedException|ExecutionException e ){
            //     System.err.println(e);
            // }
        

        // get collections.document.key -> value
            // try{
            //     DocumentReference docRef = db.collection("users").document("alovelace");
            //     //asynchronously retrieve the document
            //     ApiFuture<DocumentSnapshot> future = docRef.get();
            //     DocumentSnapshot document=future.get();
            //     if(document.exists()){
            //         System.out.println(document.get("last"));
            //     }else{
            //         System.out.println("We dont have Doc alovelace");
            //     }
            // }catch(InterruptedException|ExecutionException e ){
            //     System.err.println(e);
            // }
        
        
        // upsert collections.document key-value
        // try{
        //     DocumentReference docRef = db.collection("users").document("alovelace");
        //     // Update using key document
        //     ApiFuture<WriteResult> future = docRef.update("last", "Lovelace2");
        //     WriteResult result = future.get();
        //     System.out.println("Write result: "+result);            
        // } catch (Exception  e) {
        //     System.err.println(e);
        // }
        // Using set to update whole docu: db.collection("cities").document("new-city-id").set(data);
        // Or Add document data with auto-generated id.
            // Map<String, Object> data = new HashMap<>();
            // data.put("name", "Tokyo");
            // data.put("country", "Japan");
            // ApiFuture<DocumentReference> addedDocRef = db.collection("cities").add(data);
            // System.out.println("Added document with ID: " + addedDocRef.get().getId());

        // delete collections.document key
        // try{
        //     DocumentReference docRef = db.collection("users").document("alovelace");
        //     Map<String,Object> updates = new HashMap<>();
        //     updates.put("last",FieldValue.delete());
        //     ApiFuture<WriteResult> writeResult = docRef.update(updates);
        //     System.out.println("Update time : " + writeResult.get());           
        // } catch (Exception  e) {
        //     System.err.println(e);
        // }
        // delete whole doc
        // try{
        //     ApiFuture<WriteResult> writeResult = db.collection("users").document("0").delete();
        //     System.out.println("Update time : " + writeResult.get().getUpdateTime());
        // }catch(Exception e){
        //     System.err.println(e);
        // }

        
        // does firestore has auth? yes! how to use?
    
        System.out.println("main bottom reached");
    }
}
