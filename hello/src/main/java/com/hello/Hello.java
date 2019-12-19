package com.hello;

import java.util.Collections;
import java.util.Map;
import java.util.HashMap;
import java.io.*;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.api.*;
import com.google.api.core.*;

public class Hello implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
	private InputStream serviceAccount;
	private GoogleCredentials credentials;
	private FirebaseOptions options;
	private Firestore db;
	private int StatusCode = 200;

	private static final Logger LOG = LogManager.getLogger(Hello.class);

	@Override
	public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
		LOG.info("received: {}", input);
		// get all states
		// String BodyInfo = (String)input.get("body");
		// // Below is for finding uid of
		// String email = getTarget(BodyInfo,"Email");
		// String password = getTarget(BodyInfo,"Password");
		// // Below is Log info.
		// String username = getTarget(BodyInfo,"Username");
		// String ip = getTarget(BodyInfo,"Ip");
		// String method = getTarget(BodyInfo,"Method");
		// String path = getTarget(BodyInfo,"Path");
		// String referrer = getTarget(BodyInfo,"Referrer");
		// int responseStatus = parseInt(getTarget(BodyInfo,"ResponseStatus"));
		// String date = getTarget(BodyInfo,"Date");
		// String time = getTarget(BodyInfo,"Time");
		//TEST ONLY
		String rs="";
		try {
			rs = dbInit();
		} catch (Exception e) {
			System.out.println(e);
			//when catch error, return 500 instead.
			StatusCode = 500;
			rs = String.valueOf(e);
		}
		rs = test();

		Response responseBody = new Response(rs, input);
		return ApiGatewayResponse.builder()
			.setStatusCode(StatusCode)
			.setObjectBody(responseBody)
			.setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & serverless"))
			.build();
	}
	
	public String test() {
		try{
			DocumentReference docRef = db.collection("bi3yY2Du9McqrwrPFyJWgaXtGQt2").document("fraCGMEY3PgLWZr1ELXS");
			// asynchronously retrieve the document
			ApiFuture<DocumentSnapshot> future = docRef.get();
			// ...
			// future.get() blocks on response
			DocumentSnapshot document = future.get();
			if (document.exists()) {
			  LOG.info("Document data: " + document.getData());
			} else {
			  LOG.info("No such document!");
			}
			// DocumentReference docRef = db.collection("TestCollection").document("TestDoc");
			// Map<String, Object> data = new HashMap<>();
			// data.put("first", "Ada");
			// data.put("last", "Lovelace");
			// data.put("born", 1815);
			// ApiFuture<WriteResult> result = docRef.set(data);
			// System.out.println("Update time : " + result.get().getUpdateTime());
			return ("Success");
		}catch(Exception e){
			return ("Fail"+String.valueOf(e));
		}

	}
	
	// this function is to init all firebase stuff.
	public String dbInit() throws FileNotFoundException,IOException {
		ClassLoader classLoader = getClass().getClassLoader();
        File cityFile = new File(classLoader.getResource("logsystem-2ada2-7a4876aad0fe.json").getFile());
		FileInputStream fis = new FileInputStream(cityFile);

		credentials = GoogleCredentials.fromStream(fis);
		options = new FirebaseOptions.Builder()
			.setCredentials(credentials)
			.build();
		FirebaseApp.initializeApp(options);
		db = FirestoreClient.getFirestore();
		return "Db:"+String.valueOf(db);
	}

	public String getTarget(String str,String Target){
		String[] lines = str.split("[\\r\\n]+");
		boolean keyLineFlag = false;
		String rs="";
		for(String a : lines){
			System.out.println(a);
			if (a.contains(Target)){
				keyLineFlag=true;
				continue;
			}
			if(keyLineFlag){
				rs=a;
				keyLineFlag=false;
			}
		}
		return(rs);
	}

	public int parseInt(String str){
		int rs = -1;
		try {
			rs = Integer.valueOf(str).intValue();
		} catch (NumberFormatException e) {
			e.printStackTrace();
		}
		return(rs);
	}
}
