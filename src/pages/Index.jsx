import React, { useState } from "react";
import { Box, Heading, Text, VStack, Input, Button, Image, Flex, Spacer, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FaRobot, FaUser, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [image, setImage] = useState(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const bg = useColorModeValue("gray.100", "gray.700");
  const inputBg = useColorModeValue("white", "gray.600");
  const buttonBg = useColorModeValue("blue.500", "blue.300");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setChat([
      {
        role: "assistant",
        content: "Wow, what an interesting image! I'm excited to chat about it. Ask me anything!",
      },
    ]);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setChat([...chat, { role: "user", content: message }]);
      // TODO: Implement actual image analysis and chat response logic
      const reply = {
        role: "assistant",
        content: `You said: "${message}". That's a great observation about the image! What else would you like to know?`,
      };
      setChat([...chat, { role: "user", content: message }, reply]);
      setMessage("");
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Image Chat AI
      </Heading>

      {image ? (
        <VStack spacing={4} align="stretch">
          <Image src={image} alt="Uploaded image" mb={4} />

          <Box borderWidth={1} borderRadius="lg" p={4} h="60vh" overflowY="auto" bg={bg}>
            {chat.map((msg, index) => (
              <Flex key={index} mb={4} alignItems="flex-start">
                <Box bg={msg.role === "assistant" ? "blue.500" : "gray.500"} color="white" borderRadius="full" p={2} mr={2}>
                  {msg.role === "assistant" ? <FaRobot /> : <FaUser />}
                </Box>
                <Text>{msg.content}</Text>
              </Flex>
            ))}
          </Box>

          <Flex>
            <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." bg={inputBg} />
            <Spacer />
            <IconButton icon={<FaPaperPlane />} onClick={handleSendMessage} colorScheme="blue" bg={buttonBg} ml={2} />
          </Flex>
        </VStack>
      ) : (
        <VStack spacing={8}>
          <Text fontSize="xl">Upload an image to start chatting!</Text>
          <Input type="file" onChange={handleImageUpload} />
        </VStack>
      )}
    </Box>
  );
};

export default Index;
